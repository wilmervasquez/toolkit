import fs from "fs/promises";
import path from "path";

interface PrismaFile {
  path: string;
  content: string;
}
async function getPrismaFilesRecursively(dir) {
  let results: PrismaFile[] = [];
  const files = await fs.readdir(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(await getPrismaFilesRecursively(fullPath));
    } else if (file.endsWith(".prisma")) {
      const content = await fs.readFile(fullPath, "utf-8");
      results.push({path: fullPath, content});
    }
  }

  return results;
}

const folderPath = "./prisma";

const files = await getPrismaFilesRecursively(folderPath);

const combinedContent = files.map(file => file.content).join("\n");
await fs.writeFile(path.join('dist', "schema.prisma"), combinedContent);
