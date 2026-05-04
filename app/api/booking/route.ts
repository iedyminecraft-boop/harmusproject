import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      fullName,
      countryId,
      countryOrigin,
      city,
      phone,
      email,
      notes,
      car,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
      totalDays,
      totalPrice,
    } = body;

    // Validate required fields
    if (!fullName || !countryId || !countryOrigin || !city || !phone || !email) {
      return NextResponse.json(
        { error: "Toate câmpurile obligatorii trebuie completate" },
        { status: 400 }
      );
    }

    // Save to database
    const supabase = await createClient();
    
    const { data: booking, error: dbError } = await supabase
      .from("bookings")
      .insert({
        full_name: fullName,
        country_id: countryId,
        country_origin: countryOrigin,
        city: city,
        phone: phone,
        email: email,
        notes: notes || null,
        car_name: car.name,
        car_category: car.category,
        car_price_per_day: car.price,
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        pickup_date: pickupDate,
        dropoff_date: dropoffDate,
        total_days: totalDays,
        total_price: totalPrice,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Eroare la salvarea rezervării" },
        { status: 500 }
      );
    }

    // Send email notification
    const emailContent = `
    Rezervare Nouă - Harmus Rent a Car
    ==================================
    
    DETALII CLIENT:
    - Nume: ${fullName}
    - Email: ${email}
    - Telefon: ${phone}
    - Țară (act identitate): ${countryId}
    - Țară (origine): ${countryOrigin}
    - Oraș: ${city}
    
    DETALII REZERVARE:
    - Mașină: ${car.name} (${car.category})
    - An fabricație: ${car.year}
    - Preț/zi: ${car.price}€
    
    - Loc preluare: ${pickupLocation}
    - Loc predare: ${dropoffLocation}
    - Data preluare: ${new Date(pickupDate).toLocaleDateString("ro-RO")}
    - Data predare: ${new Date(dropoffDate).toLocaleDateString("ro-RO")}
    
    - Total zile: ${totalDays}
    - TOTAL: ${totalPrice}€
    
    NOTE ADIȚIONALE:
    ${notes || "Nicio notă"}
    
    ==================================
    ID Rezervare: ${booking.id}
    Data: ${new Date().toLocaleString("ro-RO")}
    `;

    // Try to send email via Resend (if API key is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: "Harmus Rent a Car <onboarding@resend.dev>",
          to: "iedyminecraft@gmail.com",
          subject: `Rezervare Nouă: ${car.name} - ${fullName}`,
          text: emailContent,
        });
      } catch (emailError) {
        console.error("Email send error:", emailError);
        // Don't fail the request if email fails
      }
    } else {
      // Log the booking details if no email service
      console.log("New booking received:");
      console.log(emailContent);
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      message: "Rezervarea a fost trimisă cu succes!",
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "A apărut o eroare neașteptată" },
      { status: 500 }
    );
  }
}
