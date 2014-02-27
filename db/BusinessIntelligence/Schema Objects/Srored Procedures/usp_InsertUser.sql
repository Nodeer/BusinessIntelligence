CREATE PROCEDURE [dbo].[usp_InsertUser]
    @username NVARCHAR(50),
    @password NVARCHAR(150)
AS
BEGIN
    INSERT INTO [dbo].[User] (
        Username,
        Password
    ) VALUES (
        @username,
        @password
    );

    SELECT SCOPE_IDENTITY() UserId;
END
