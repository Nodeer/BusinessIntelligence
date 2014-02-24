CREATE TABLE [dbo].[User]
(
    [UserId] INT NOT NULL IDENTITY(1, 1) PRIMARY KEY, 
    [Username] NVARCHAR(50) NOT NULL, 
    [Password] NVARCHAR(150) NOT NULL, 
    [UpdatedBy] NVARCHAR(50) NOT NULL DEFAULT SUSER_SNAME(),
    [UpdatedDate] DATETIME2 NOT NULL DEFAULT SYSDATETIME()
)

GO

CREATE INDEX [IX_User_Username] ON [dbo].[User] ([Username])
