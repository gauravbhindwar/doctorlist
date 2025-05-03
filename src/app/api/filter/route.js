import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConfig";
import Doctor from "@/lib/db/doctorSchema";

export async function GET(request) {
  try {
    await connectDB();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    
    // Parse pagination parameters
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    
    // Parse filters
    const experienceRanges = searchParams.getAll('experience');
    const fees = searchParams.getAll('fees');
    const languages = searchParams.getAll('language');
    const facilities = searchParams.getAll('facility');
    const isOnline = searchParams.get('isOnline');
    const offersVisit = searchParams.get('offersVisit');
    const specialization = searchParams.get('specialization');
    
    // Build filter query
    const query = {};
    
    // Handle experience filter
    if (experienceRanges.length > 0) {
      const experienceQuery = [];
      
      experienceRanges.forEach(range => {
        if (range === '0-5') {
          experienceQuery.push({ experience: { $gte: 0, $lte: 5 } });
        } else if (range === '6-10') {
          experienceQuery.push({ experience: { $gte: 6, $lte: 10 } });
        } else if (range === '11-16') {
          experienceQuery.push({ experience: { $gte: 11, $lte: 16 } });
        } else if (range === '16+') {
          experienceQuery.push({ experience: { $gte: 16 } });
        }
      });
      
      if (experienceQuery.length > 0) {
        query.$or = experienceQuery;
      }
    }
    
    // Handle fees filter
    if (fees.length > 0) {
      const feesQuery = [];
      
      fees.forEach(range => {
        if (range === '100-500') {
          feesQuery.push({ fees: { $gte: 100, $lte: 500 } });
        } else if (range === '500-1000') {
          feesQuery.push({ fees: { $gte: 500, $lte: 1000 } });
        } else if (range === '1000+') {
          feesQuery.push({ fees: { $gte: 1000 } });
        }
      });
      
      if (feesQuery.length > 0) {
        query.$or = query.$or ? [...query.$or, ...feesQuery] : feesQuery;
      }
    }
    
    // Handle language filter
    if (languages.length > 0) {
      query.languages = { $in: languages };
    }
    
    // Handle facility filter
    if (facilities.length > 0) {
      query.clinicName = { $in: facilities };
    }
    
    // Handle online consultation filter
    if (isOnline === 'true') {
      query.isOnline = true;
    } else if (isOnline === 'false') {
      query.isOnline = false;
    }
    
    // Handle hospital visit filter
    if (offersVisit === 'true') {
      query.offersVisit = true;
    } else if (offersVisit === 'false') {
      query.offersVisit = false;
    }
    
    // Handle specialization filter
    if (specialization) {
      query.specialization = specialization;
    }
    
    // Execute query with pagination
    const doctors = await Doctor.find(query)
      .sort({ experience: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Doctor.countDocuments(query);
    
    return NextResponse.json(
      { 
        success: true, 
        data: doctors, 
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}