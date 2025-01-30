"use client"

import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { BookingFormValues } from "../../schemas/booking.schema"

interface AdditionalGuestsProps {
  form: UseFormReturn<BookingFormValues>
  additionalGuestsNeeded: number
}

export function AdditionalGuests({ form, additionalGuestsNeeded }: AdditionalGuestsProps) {
  if (additionalGuestsNeeded <= 0) return null

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Additional Guests</label>
      {Array.from({ length: additionalGuestsNeeded }).map((_, index) => (
        <FormField
          key={index}
          control={form.control}
          name={`guest${index + 2}Name` as keyof BookingFormValues}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={`Guest ${index + 2} Name`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}