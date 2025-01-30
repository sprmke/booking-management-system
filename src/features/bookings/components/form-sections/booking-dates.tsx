"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { BookingFormValues } from "../../schemas/booking.schema"

interface BookingDatesProps {
  form: UseFormReturn<BookingFormValues>
}

export function BookingDates({ form }: BookingDatesProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="checkInDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-in Date *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkInTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-in Time</FormLabel>
              <FormControl>
                <Input 
                  type="time" 
                  placeholder="02:00 pm"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Will be formatted as "02:00 pm"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="checkOutDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-out Date *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkOutTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-out Time</FormLabel>
              <FormControl>
                <Input 
                  type="time" 
                  placeholder="11:00 am"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Will be formatted as "11:00 am"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}