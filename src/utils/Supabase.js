import { createClient } from '@supabase/supabase-js'
import toast from 'react-hot-toast';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// function that insert data to the supabase

export async function insertDataIntoTable() {
  const storedUserData = localStorage.getItem('currentUser');
  const currentUser = storedUserData ? JSON.parse(storedUserData) : { name: '', points: 0 };
  const dataToInsert = {name: currentUser.name, score: parseInt(currentUser.points)};
  const { data, error } = await supabase
      .from('players')
      .insert([dataToInsert]);
    if (error) {
      console.log(error);
      toast.error('Error inserting data');
    }
}

// function that insert data to the supabase

export async function getAllDataFromSupabase() {
    const { data, error } = await supabase
      .from('players')
      .select('*');

    if (error) {
      toast.error('Error fetching data');
      console.log(error);
    } else {
      console.log(data);
      return (data);
    }
  }

