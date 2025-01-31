"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { BookingFormValues } from "../../schemas/booking.schema"

interface GuestCountProps {
  form: UseFormReturn<BookingFormValues>
}

export function GuestCount({ form }: GuestCountProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="numberOfAdults"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Adults</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="1"
                {...field}
                onChange={e => {
                  const value = parseInt(e.target.value) || 1;
                  const validValue = Math.max(1, value);
                  field.onChange(validValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="numberOfChildren"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Children</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="0"
                {...field}
                onChange={e => {
                  const value = parseInt(e.target.value) || 0;
                  const validValue = Math.max(0, value);
                  field.onChange(validValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}