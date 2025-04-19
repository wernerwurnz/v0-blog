-- Function to delete a user account
CREATE OR REPLACE FUNCTION delete_user_account()
RETURNS void AS $$
DECLARE
  current_user_id UUID;
BEGIN
  -- Get the current user's ID
  current_user_id := auth.uid();
  
  -- Delete user data from various tables
  DELETE FROM favorites WHERE user_id = current_user_id;
  DELETE FROM user_likes WHERE user_id = current_user_id;
  DELETE FROM comments WHERE user_id = current_user_id;
  DELETE FROM user_profiles WHERE id = current_user_id;
  
  -- Note: In a real application, you would also need to delete the user from auth.users
  -- This typically requires admin privileges and would be done through a server-side function
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
