"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { BookingFormValues } from "../../schemas/booking.schema"

interface GuestInfoProps {
  form: UseFormReturn<BookingFormValues>
}

export function GuestInfo({ form }: GuestInfoProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="guestFacebookName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guest Facebook Name *</FormLabel>
            <FormControl>
              <Input placeholder="Your username/name in Facebook" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="primaryGuestName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Guest Name *</FormLabel>
            <FormControl>
              <Input placeholder="Full name of Primary Guest" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="guestEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guest Email *</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Ex. juandelacruz@gmail.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="guestPhoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guest Phone Number *</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="Ex. 0987 654 3210" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="guestAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guest Address *</FormLabel>
            <FormControl>
              <Input placeholder="City, Province" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}