CREATE TABLE [dbo].[Task]
(
    [TaskId] INT NOT NULL IDENTITY(1, 1) NOT FOR REPLICATION, 
    [ExternalId] NVARCHAR(50) NOT NULL DEFAULT '', 
    [Name] NVARCHAR(200) NULL, 
    [Active] BIT NOT NULL DEFAULT 1, 
    [UpdatedBy] NVARCHAR(50) NOT NULL DEFAULT SUSER_SNAME(), 
    [UpdatedDate] DATETIME2 NOT NULL DEFAULT SYSDATETIME()
)

GO

ALTER TABLE [dbo].[Task]
    ADD CONSTRAINT [PK_TaskId]
    PRIMARY KEY (TaskId)

GO

CREATE INDEX [IX_Task_ExternalId_Active] ON [dbo].[Task] ([ExternalId], [Active])

GO

CREATE FULLTEXT INDEX ON [dbo].[Task] ([Name]) KEY INDEX [PK_TaskId] ON [FullTextCatalog] WITH CHANGE_TRACKING AUTO

GO

CREATE TRIGGER [dbo].[Trigger_Task_TaskSnapshot]
    ON [dbo].[Task]
    AFTER INSERT, UPDATE
    AS
    BEGIN
        INSERT INTO [dbo].[TaskSnapshot] (
            TaskId,
            ExternalId,
            Name,
            Active,
            UpdatedBy,
            UpdatedDate
        )
        SELECT 
            i.TaskId,
            i.ExternalId,
            i.Name,
            i.Active,
            i.UpdatedBy,
            i.UpdatedDate
        FROM INSERTED i;
    END