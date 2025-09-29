export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      daily_nutrition: {
        Row: {
          calories: number | null
          carbs: number | null
          consumed_at: string
          created_at: string
          fats: number | null
          id: string
          meal_name: string
          meal_type: string
          notes: string | null
          protein: number | null
          user_id: string
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          consumed_at?: string
          created_at?: string
          fats?: number | null
          id?: string
          meal_name: string
          meal_type: string
          notes?: string | null
          protein?: number | null
          user_id: string
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          consumed_at?: string
          created_at?: string
          fats?: number | null
          id?: string
          meal_name?: string
          meal_type?: string
          notes?: string | null
          protein?: number | null
          user_id?: string
        }
        Relationships: []
      }
      diet_plans: {
        Row: {
          author_id: string
          client_id: string
          created_at: string | null
          description: string | null
          id: string
          meals: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          client_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          meals?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          client_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          meals?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      invitations: {
        Row: {
          created_at: string | null
          id: string
          invitee_email: string
          inviter_id: string
          status: Database["public"]["Enums"]["invitation_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          invitee_email: string
          inviter_id: string
          status?: Database["public"]["Enums"]["invitation_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          invitee_email?: string
          inviter_id?: string
          status?: Database["public"]["Enums"]["invitation_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      measurements: {
        Row: {
          arms: number | null
          body_fat: number | null
          chest: number | null
          created_at: string | null
          hips: number | null
          id: string
          muscle_mass: number | null
          thighs: number | null
          user_id: string | null
          waist: number | null
          weight: number | null
        }
        Insert: {
          arms?: number | null
          body_fat?: number | null
          chest?: number | null
          created_at?: string | null
          hips?: number | null
          id?: string
          muscle_mass?: number | null
          thighs?: number | null
          user_id?: string | null
          waist?: number | null
          weight?: number | null
        }
        Update: {
          arms?: number | null
          body_fat?: number | null
          chest?: number | null
          created_at?: string | null
          hips?: number | null
          id?: string
          muscle_mass?: number | null
          thighs?: number | null
          user_id?: string | null
          waist?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          coach_id: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          coach_id?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          coach_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      progress_photos: {
        Row: {
          back_photo_url: string | null
          created_at: string | null
          front_photo_url: string | null
          id: string
          left_side_photo_url: string | null
          notes: string | null
          right_side_photo_url: string | null
          user_id: string | null
        }
        Insert: {
          back_photo_url?: string | null
          created_at?: string | null
          front_photo_url?: string | null
          id?: string
          left_side_photo_url?: string | null
          notes?: string | null
          right_side_photo_url?: string | null
          user_id?: string | null
        }
        Update: {
          back_photo_url?: string | null
          created_at?: string | null
          front_photo_url?: string | null
          id?: string
          left_side_photo_url?: string | null
          notes?: string | null
          right_side_photo_url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          activity_level: string | null
          age: number | null
          available_time: number | null
          avatar_url: string | null
          body_fat: number | null
          budget: string | null
          created_at: string | null
          daily_routine: string | null
          email: string | null
          equipment: string[] | null
          gender: string | null
          goal: string | null
          health_issues: string[] | null
          height: number | null
          id: string
          muscle_mass: number | null
          name: string | null
          profile_completed: boolean | null
          target_weight: number | null
          training_days: number | null
          training_experience: string | null
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          available_time?: number | null
          avatar_url?: string | null
          body_fat?: number | null
          budget?: string | null
          created_at?: string | null
          daily_routine?: string | null
          email?: string | null
          equipment?: string[] | null
          gender?: string | null
          goal?: string | null
          health_issues?: string[] | null
          height?: number | null
          id: string
          muscle_mass?: number | null
          name?: string | null
          profile_completed?: boolean | null
          target_weight?: number | null
          training_days?: number | null
          training_experience?: string | null
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          available_time?: number | null
          avatar_url?: string | null
          body_fat?: number | null
          budget?: string | null
          created_at?: string | null
          daily_routine?: string | null
          email?: string | null
          equipment?: string[] | null
          gender?: string | null
          goal?: string | null
          health_issues?: string[] | null
          height?: number | null
          id?: string
          muscle_mass?: number | null
          name?: string | null
          profile_completed?: boolean | null
          target_weight?: number | null
          training_days?: number | null
          training_experience?: string | null
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      workout_plans: {
        Row: {
          author_id: string
          client_id: string
          created_at: string | null
          description: string | null
          exercises: Json | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          client_id: string
          created_at?: string | null
          description?: string | null
          exercises?: Json | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          client_id?: string
          created_at?: string | null
          description?: string | null
          exercises?: Json | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      workout_sessions: {
        Row: {
          completed_at: string
          created_at: string
          duration_minutes: number | null
          exercises_completed: Json | null
          id: string
          notes: string | null
          user_id: string
          workout_name: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          duration_minutes?: number | null
          exercises_completed?: Json | null
          id?: string
          notes?: string | null
          user_id: string
          workout_name: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          duration_minutes?: number | null
          exercises_completed?: Json | null
          id?: string
          notes?: string | null
          user_id?: string
          workout_name?: string
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
      invitation_status: "pending" | "accepted" | "declined"
      user_role: "aluno" | "professor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      invitation_status: ["pending", "accepted", "declined"],
      user_role: ["aluno", "professor"],
    },
  },
} as const
