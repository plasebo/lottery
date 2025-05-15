export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      participants: {
        Row: {
          id: number
          created_at: string
          name: string
          phone: string
          code: string
          is_winner: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          phone: string
          code: string
          is_winner?: boolean
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          phone?: string
          code?: string
          is_winner?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}