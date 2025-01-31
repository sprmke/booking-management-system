import * as z from "zod"

export const bookingFormSchema = z.object({
  guestFacebookName: z.string().min(2, "Facebook name must be at least 2 characters"),
  primaryGuestName: z.string().min(2, "Full name must be at least 2 characters"),
  guestEmail: z.string().email("Invalid email address"),
  guestPhoneNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  guestAddress: z.string().min(5, "Address must be at least 5 characters"),
  checkInDate: z.string().min(1, "Please select check-in date"),
  checkOutDate: z.string().min(1, "Please select check-out date"),
  guest2Name: z.string().optional(),
  guest3Name: z.string().optional(),
  guest4Name: z.string().optional(),
  guest5Name: z.string().optional(),
  guestSpecialRequests: z.string().optional(),
  findUs: z.string().min(1, "Please select how you found us"),
  needParking: z.boolean().default(false),
  carPlateNumber: z.string().optional(),
  carBrandModel: z.string().optional(),
  carColor: z.string().optional(),
  hasPets: z.boolean().default(false),
  petName: z.string().optional(),
  petBreed: z.string().optional(),
  petAge: z.string().optional(),
  petVaccinationDate: z.string().optional(),
  checkInTime: z.string().default("14:00"),
  checkOutTime: z.string().default("11:00"),
  nationality: z.string().default("Filipino"),
  numberOfAdults: z.number().min(1, "At least 1 adult is required"),
  numberOfChildren: z.number().min(0, "Number of children cannot be negative"),
})

export type BookingFormValues = z.infer<typeof bookingFormSchema>

export const defaultBookingValues: Partial<BookingFormValues> = {
  checkInTime: "14:00",
  checkOutTime: "11:00",
  nationality: "Filipino",
  numberOfAdults: 1,
  numberOfChildren: 0,
  needParking: false,
  hasPets: false,
}