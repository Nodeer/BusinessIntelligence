CREATE PROCEDURE [dbo].[usp_FindUserByUsernamePassword]
    @username NVARCHAR(50),
    @password NVARCHAR(150)
AS
BEGIN
    SELECT
        u.UserId,
        u.Username
    FROM [dbo].[User] u
    WHERE u.Username = @username
        AND u.Password = @password;
END
