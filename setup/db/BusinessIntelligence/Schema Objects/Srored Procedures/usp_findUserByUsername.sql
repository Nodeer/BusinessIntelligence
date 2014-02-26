CREATE PROCEDURE [dbo].[usp_FindUserByUsername]
    @username NVARCHAR(50)
AS
BEGIN
    SELECT
        u.UserId,
        u.Username
    FROM [dbo].[User] u
    WHERE u.Username = @username;
END
