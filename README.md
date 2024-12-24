
# Travel-Desk

This canister provides functionality for managing and interacting with travel-related entities such as activities, hotels, flights, and their respective bookings. Below is an overview of the defined records, variants, storages, and exposed methods.

---

## Data Structures

### Records

#### **Activity**
- **Fields:**
  - `activityId`: `text`
  - `activityName`: `text`
  - `price`: `nat`
  - `location`: `text`
  - `duration`: `text`
  - `participants`: `Vec<text>`
  - `reviews`: `Vec<text>`

#### **Hotels**
- **Fields:**
  - `hotelId`: `text`
  - `name`: `text`
  - `location`: `text`
  - `typeOfRoom`: `text`
  - `availableRooms`: `nat`
  - `amenities`: `text`
  - `price`: `nat`
  - `numberOfRooms`: `nat`
  - `rating`: `nat`
  - `guests`: `Vec<text>`
  - `reviews`: `Vec<text>`

#### **Flight**
- **Fields:**
  - `flightId`: `text`
  - `airline`: `text`
  - `flightType`: `text`
  - `typeOfPlane`: `text`
  - `departure`: `text`
  - `destination`: `text`
  - `departureTime`: `text`
  - `arrivalTime`: `text`
  - `rating`: `nat`
  - `totalSeats`: `nat`
  - `basePrice`: `nat`
  - `flightClass`: `Vec<FlightClass>`
  - `tickets`: `Vec<text>`

#### **BookActivity**
- **Fields:**
  - `activityId`: `text`
  - `userName`: `text`
  - `userPhoneNumber`: `text`
  - `numberOfPeople`: `nat`

#### **BookHotel**
- **Fields:**
  - `hotelId`: `text`
  - `userName`: `text`
  - `numberOfRooms`: `nat`
  - `duration`: `nat`
  - `typeOfRoom`: `text`

#### **Ticket**
- **Fields:**
  - `ticketId`: `text`
  - `userName`: `text`
  - `flightId`: `text`
  - `flightClass`: `text`
  - `numberOfSeats`: `nat`

#### **Reviews**
- **Fields:**
  - `reviewId`: `text`
  - `userId`: `text`
  - `hotelId`: `text`
  - `flightId`: `text`
  - `activityId`: `text`
  - `review`: `text`
  - `rating`: `nat`

---

### Variants

#### **FlightClass**
- **Options:**
  - `Economy`: `{ price: nat, availableSeats: nat }`
  - `Business`: `{ price: nat, availableSeats: nat }`
  - `First`: `{ price: nat, availableSeats: nat }`

#### **Message**
- **Options:**
  - `NotFound`: `text`
  - `Success`: `text`
  - `Error`: `text`
  - `NotAllowed`: `text`

---

## Storage

- **ActivityStorage**: Stores `Activity` records.
- **HotelsStorage**: Stores `Hotels` records.
- **FlightStorage**: Stores `Flight` records.
- **TicketStorage**: Stores `Ticket` records.

---

## Methods

### Activities
- `addActivity(payload: ActivityPayload)`: Add a new activity.
- `getActivities()`: Retrieve all activities.
- `getActivity(id: text)`: Retrieve a specific activity by ID.
- `getActivityParticipants(id: text)`: Retrieve participants of a specific activity.

### Hotels
- `addHotel(payload: HotelsPayload)`: Add a new hotel.
- `getHotels()`: Retrieve all hotels.
- `getHotel(id: text)`: Retrieve a specific hotel by ID.

### Flights
- `addFlight(payload: FlightPayload)`: Add a new flight.
- `getFlights()`: Retrieve all flights.
- `getFlight(id: text)`: Retrieve a specific flight by ID.
- `getAvailableFlights()`: Retrieve flights with available seats.

### Bookings
- `bookActivity(payload: BookActivityPayload)`: Book an activity.
- `bookHotel(payload: BookHotelPayload)`: Book a hotel.
- `bookFlight(payload: TicketPayload, id: text)`: Book a flight.

### Tickets
- `getTicket(id: text)`: Retrieve a specific ticket by ID.
- `getTickets()`: Retrieve all tickets.
- `getTicketByFlightId(flightId: text)`: Retrieve tickets by flight ID.

### Search
- `searchFlights(destination: text)`: Search flights by destination.
- `searchHotels(location: text)`: Search hotels by location.
- `searchActivities(location: text)`: Search activities by location.
- `searchActivitiesByPrice(price: nat)`: Search activities by price.
- `searchHotelsByPrice(price: nat)`: Search hotels by price.
- `searchFlightsByPrice(price: nat)`: Search flights by price.

---

## Notes

This canister uses `StableBTreeMap` for persistent storage and `uuidv4` for generating unique IDs. It follows a structured and modular approach to handle various travel-related entities and actions.

```
## Technology Stack
- **Backend**: Azle, ICP


## Setup Instructions

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **dfx**: You have installed the latest version of the DFINITY Canister SDK, `dfx`. You can download it from the DFINITY SDK page. [installation guide](https://demergent-labs.github.io/azle/get_started.html#installation)

 ```
  use version dfx 0.22.0
 ```
- **Node.js**: You have installed Node.js, version 18 or above.
```
 v20.12.2

```
- Azle version use 
 ```
  azle 0.24.1
 ```

 - podman verion use

 ```
  podman version 3.4.4
  
 ```
Please ensure all these prerequisites are met before proceeding with the setup of the project.
# Running the project locally

If you want to test your project locally, you can use the following commands:

Cloning repo:

```bash
git clone https://github.com/zoriah23/Travel-Desk.git
cd Travel-Desk
```


### run and deploy:

```bash

# Installing Dependencies
npm i

# Starts the replica, running in the background
dfx start --host 127.0.0.1:8000 --clean --background

# Deploys
dfx deploy

## Contributing
We invite community contributions! To contribute, please fork the repository and submit a pull request with your modifications. Make sure your code adheres to the current coding standards and is thoroughly documented.

