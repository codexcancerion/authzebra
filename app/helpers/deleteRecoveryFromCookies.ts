'use server'
 
import { cookies } from 'next/headers'
 
export async function deleteRecovery() {
  cookies().delete('recover')
}