import { isSupabaseConfigured } from '../../lib/supabase/client';

export type FlowerStorageMode = 'auto' | 'local' | 'supabase';

export function getFlowerStorageMode(): FlowerStorageMode {
  return 'local';
}

export function shouldUseFlowerSupabase(mode: FlowerStorageMode): boolean {
  if (mode === 'local') {
    return false;
  }

  if (mode === 'supabase') {
    return true;
  }

  return isSupabaseConfigured();
}
