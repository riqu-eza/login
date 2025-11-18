import { connectDB } from "@/app/lib/mongo";
import { User } from "@/app/models/User";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  console.log("Login attempt:", body);
   const { email, password } = body;
   const newUser = await User.create({ name: email, password });
   console.log("User created:", newUser);

  return new Response(
    JSON.stringify({ message: "User created successfully" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
