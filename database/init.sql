-- =========================================================
-- Trains
-- =========================================================
CREATE TABLE trains (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- =========================================================
-- Stations
-- =========================================================
CREATE TABLE stations (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    route_order INTEGER NOT NULL
);

-- =========================================================
-- Coaches
-- =========================================================
CREATE TABLE coaches (
    id BIGSERIAL PRIMARY KEY,
    train_id BIGINT NOT NULL REFERENCES trains(id),
    coach_number BIGINT NOT NULL,
    type VARCHAR(255) NOT NULL,
    seat_count INTEGER NOT NULL,

    CONSTRAINT uq_train_coach_number UNIQUE (train_id, coach_number)
);

-- =========================================================
-- Seats
-- =========================================================
CREATE TABLE seats (
    id BIGSERIAL PRIMARY KEY,
    coach_id BIGINT NOT NULL REFERENCES coaches(id),
    seat_number INTEGER NOT NULL,
    type VARCHAR(255),

    CONSTRAINT uq_coach_seat_number UNIQUE (coach_id, seat_number)
);

-- =========================================================
-- Fares
-- =========================================================
CREATE TABLE fares (
    id BIGSERIAL PRIMARY KEY,
    base_fare NUMERIC(10,2) NOT NULL,
    fare_per_segment NUMERIC(10,2) NOT NULL,
    effective_from TIMESTAMP NOT NULL,
    coach_type VARCHAR(255) NOT NULL
);

-- =========================================================
-- Departures
-- =========================================================
CREATE TABLE departures (
    id BIGSERIAL PRIMARY KEY,
    train_id BIGINT NOT NULL REFERENCES trains(id),
    departure_time TIMESTAMP NOT NULL,
    origin_order INTEGER NOT NULL,
    destination_order INTEGER NOT NULL,
    direction VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL
);

-- =========================================================
-- Bookings
-- =========================================================
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    seat_id BIGINT NOT NULL,
    seat_number BIGINT NOT NULL,
    coach_id BIGINT NOT NULL,
    train_id BIGINT NOT NULL,
    departure_id BIGINT NOT NULL,

    passenger_name VARCHAR(255) NOT NULL,
    passenger_contact VARCHAR(255) NOT NULL,
    passenger_nic VARCHAR(255) NOT NULL,

    origin_order INTEGER NOT NULL,
    destination_order INTEGER NOT NULL,

    fare_amount NUMERIC(10,2) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    travel_date TIMESTAMP NOT NULL,

    is_verified BOOLEAN DEFAULT false,

    direction VARCHAR(50) NOT NULL,

    journey_range int4range
);

CREATE EXTENSION IF NOT EXISTS btree_gist;


CREATE OR REPLACE FUNCTION update_journey_range()
RETURNS TRIGGER AS $$
BEGIN
    NEW.journey_range :=
        int4range(
            NEW.origin_order,
            NEW.destination_order,
            '[)'
        );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER journey_range_trigger
BEFORE INSERT OR UPDATE
ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_journey_range();


ALTER TABLE bookings
ADD CONSTRAINT no_overlapping_seat_booking
EXCLUDE USING gist (
    train_id WITH =,
    coach_id WITH =,
    seat_id WITH =,
    travel_date WITH =,
    journey_range WITH &&
);