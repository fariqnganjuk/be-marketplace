import { PrismaClient, RoleUser, Gender } from "@prisma/client";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  const email = "infosayurmayur05@gmail.com";
  const password = "Marketplacenganjuk2025!!";
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log("⚠️ Superadmin sudah ada!");
    return;
  }

  await prisma.user.create({
    data: {
      name: "Super Admin",
      username: "superadmin",
      gender: Gender.male, // sesuai enum di schema
      email,
      phone: "081503390615",
      password: hashedPassword,
      role: RoleUser.superadmin, // pakai enum, bukan string
      address: "Nganjuk, Jawa Timur",
      isActive: true,
      activationCode: uuidv4(),
    },
  });

  console.log("✅ Superadmin berhasil dibuat!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
