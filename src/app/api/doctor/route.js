import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConfig";
import Doctor from "@/lib/db/doctorSchema";

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Check if the request is for bulk upload (array) or single doctor (object)
    if (Array.isArray(body)) {
      // Handle bulk upload
      const results = {
        success: true,
        created: [],
        failed: []
      };
      
      // Process each doctor record
      for (const doctorData of body) {
        try {
          // Validate required fields
          const requiredFields = [
            'name', 'title', 'specialization', 'experience',
            'education', 'clinicName', 'location', 'fees'
          ];
          
          const missingFields = requiredFields.filter(field => !doctorData[field]);
          
          if (missingFields.length > 0) {
            results.failed.push({
              data: doctorData,
              error: `Missing required fields: ${missingFields.join(', ')}`
            });
            continue;
          }
          
          // Create doctor record
          const doctor = await Doctor.create(doctorData);
          results.created.push(doctor);
        } catch (err) {
          results.failed.push({
            data: doctorData,
            error: err.message
          });
        }
      }
      
      // Update overall success flag if any records failed
      if (results.failed.length > 0 && results.created.length === 0) {
        results.success = false;
      }
      
      return NextResponse.json(
        results,
        { status: results.created.length > 0 ? 201 : 400 }
      );
    } else {
      // Handle single doctor upload (existing code)
      // Validate required fields
      const requiredFields = [
        'name', 'title', 'specialization', 'experience',
        'education', 'clinicName', 'location', 'fees'
      ];
      
      for (const field of requiredFields) {
        if (!body[field]) {
          return NextResponse.json(
            { success: false, message: `${field} is required` },
            { status: 400 }
          );
        }
      }
      
      // Create new doctor
      const doctor = await Doctor.create(body);
      
      return NextResponse.json(
        { success: true, data: doctor },
        { status: 201 }
      );
    }
    
  } catch (error) {
    console.error("Error adding doctor:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}