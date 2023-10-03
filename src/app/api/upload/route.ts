import { log } from 'console';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;
  const marca: String | null = data.get('marca') as String;
  const modelo: String | null = data.get('modelo') as String;
  const seats: Number | null = data.get('seats') as unknown as Number;
  const matricula: String | null = data.get('matricula') as String;
  const engine: String | null = data.get('engine') as String;
  const image: String | null = `/uploads/${file.name}` as String;
  const currentAutonomy: String | null = data.get('currentAutonomy') as String;

  const formData = {
    marca: marca,
    modelo: modelo,
    seats: seats,
    matricula: matricula,
    engine: engine,
    currentAutonomy: currentAutonomy,
    image: image,
  };

  console.log(formData);

  try {
    const res = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    // handle the error
    if (!res.ok) throw new Error(await res.text());
  } catch (e: any) {
    // Handle errors here
    console.error(e);
  }

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `./public/uploads/${file.name}`;
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json({ success: true });
}
