# PetCare Management System — Full Functional Client and Server

This project uses the original uploaded Sequelize model files unchanged.

## Included functions
- Dashboard counts and recent appointments
- Customer CRUD (create, list, details, update, delete)
- Pet CRUD with customer selection
- Veterinarian CRUD
- Appointment CRUD with customer, pet, and veterinarian dropdowns
- Treatment CRUD with appointment dropdown
- Search field in the existing top navigation (searches pet records)
- API error messages and database health endpoint

## Database setup
1. Start MySQL in XAMPP.
2. Create a database named `db_petcare`.
3. The supplied `server/config/config.json` uses:
   - username: `admin`
   - password: `admin1234`
   - host: `127.0.0.1`
4. If your local MySQL credentials differ, edit only the database connection values in `server/config/config.json`. Do not edit the model files.

The original model files and associations were not changed. Because the supplied models define their own associations, the app uses Sequelize's generated foreign-key names:
- Pet: `CustomerId`
- Appointment: `CustomerId`, `PetId`, `VeterinarianId`
- Treatment: `AppointmentId`

## Run backend
```bash
cd server
npm install
npm start
```
Backend: http://localhost:3007

## Run frontend (open a second terminal)
```bash
cd client
npm install
npm run dev
```
Frontend: http://localhost:5173

## Notes
- Create a customer before registering their pet.
- Create a pet and veterinarian before creating an appointment.
- Create an appointment before adding a treatment.
- Deleting a parent record that is referenced by another record may be rejected by MySQL. Remove or reassign related records first.
- This is a school/demo application. Add authentication, authorization, validation, and migrations before real-world deployment.
