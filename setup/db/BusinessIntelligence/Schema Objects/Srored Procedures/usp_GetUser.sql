CREATE PROCEDURE [dbo].[usp_GetUser]
    @userId INT
AS
BEGIN
    SELECT
        u.UserId,
        u.Username
    FROM [dbo].[User] u
    WHERE u.UserId = @userId;
END
