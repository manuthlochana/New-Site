-- Add database-level constraints for messages table to enforce input validation
ALTER TABLE messages 
ADD CONSTRAINT name_length CHECK (char_length(name) > 0 AND char_length(name) <= 100),
ADD CONSTRAINT email_length CHECK (char_length(email) > 0 AND char_length(email) <= 255),
ADD CONSTRAINT message_length CHECK (char_length(message) >= 10 AND char_length(message) <= 2000);