"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { bookingFormSchema, defaultBookingValues, type BookingFormValues } from "../schemas/booking.schema"
import { submitBooking } from "../services/booking.service"
import { GuestInfo } from "./form-sections/guest-info"
import { BookingDates } from "./form-sections/booking-dates"
import { GuestCount } from "./form-sections/guest-count"
import { AdditionalGuests } from "./form-sections/additional-guests"
import { ParkingInfo } from "./form-sections/parking-info"
import { PetInfo } from "./form-sections/pet-info"

export function GuestBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: defaultBookingValues,
  })

  async function onSubmit(values: BookingFormValues) {
    setIsSubmitting(true)
    
    try {
      await submitBooking(values)
      
      toast({
        title: "Success",
        description: "Your booking has been submitted successfully.",
      })

      form.reset(defaultBookingValues)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate total number of additional guests needed, capped at 4
  const totalGuests = (form.watch("numberOfAdults") || 1) + (form.watch("numberOfChildren") || 0)
  const additionalGuestsNeeded = Math.min(4, Math.max(0, totalGuests - 1))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <GuestInfo form={form} />
        <BookingDates form={form} />
        <GuestCount form={form} />
        <AdditionalGuests form={form} additionalGuestsNeeded={additionalGuestsNeeded} />
        <ParkingInfo form={form} />
        <PetInfo form={form} />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Booking'}
        </Button>
      </form>
    </Form>
  )
}