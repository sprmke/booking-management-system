"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { BookingFormValues } from "../../schemas/booking.schema"

interface PetInfoProps {
  form: UseFormReturn<BookingFormValues>
}

export function PetInfo({ form }: PetInfoProps) {
  const hasPets = form.watch("hasPets")

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="hasPets"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="w-4 h-4"
              />
            </FormControl>
            <FormLabel className="!mt-0">Bringing Pets?</FormLabel>
          </FormItem>
        )}
      />

      {hasPets && (
        <div className="pl-6 space-y-4">
          <FormField
            control={form.control}
            name="petName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. Max" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petBreed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet Breed</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. Labrador" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet Age</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. 2 years old" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petVaccinationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Vaccination Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  )
}