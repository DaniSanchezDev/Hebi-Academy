import { currentUser } from "@clerk/nextjs/server";
import { cache } from "react";

const userCache = new Map<string, string>();

export const formatUserId = (userId: string): string => {
  if (userId.length > 10) {
    return `${userId.slice(0, 4)}...${userId.slice(-4)}`;
  }
  return userId;
};


// Obtiene el nombre completo del usuario actual
 
export const getUserName = cache(async (): Promise<string> => {
  const user = await currentUser();
  if (!user) return "Unknown user";
  
  return user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.firstName || user.emailAddresses[0]?.emailAddress || "Unknown user";
});


export const getUserById = cache(async (userId: string): Promise<string> => {
  try {
    // Verificar si ya tenemos el usuario en caché
    if (userCache.has(userId)) {
      return userCache.get(userId) || formatUserId(userId);
    }

    // Comprobar si es el usuario actual
    const user = await currentUser();
    if (user?.id === userId) {
      const userName = user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || "Teacher";
      
      userCache.set(userId, userName);
      return userName;
    }
    
    // Si no podemos obtener el nombre real, usar un ID formateado
    const formattedId = formatUserId(userId);
    userCache.set(userId, `Teacher ${formattedId}`);
    return `Teacher ${formattedId}`;
  } catch (error) {
    console.error(`Error processing user ${userId}:`, error);
    return formatUserId(userId);
  }
});
