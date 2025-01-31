"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { BookingFormValues } from "../../schemas/booking.schema"

interface ParkingInfoProps {
  form: UseFormReturn<BookingFormValues>
}

export function ParkingInfo({ form }: ParkingInfoProps) {
  const needParking = form.watch("needParking")

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="needParking"
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
            <FormLabel className="!mt-0">Need Parking?</FormLabel>
          </FormItem>
        )}
      />

      {needParking && (
        <div className="pl-6 space-y-4">
          <FormField
            control={form.control}
            name="carPlateNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Plate Number</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. ABC123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carBrandModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Brand & Model</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. Honda Civic" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Color</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. Red" {...field} />
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