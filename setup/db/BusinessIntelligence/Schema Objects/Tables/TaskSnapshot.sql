CREATE TABLE [dbo].[TaskSnapshot]
(
    [TaskSnapshotId] INT NOT NULL IDENTITY(1, 1) NOT FOR REPLICATION,
    [SnapshotDate] DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    [TaskId] INT NULL,
    [ExternalId] NVARCHAR(50) NOT NULL DEFAULT '', 
    [Name] NVARCHAR(200) NULL, 
    [UpdatedBy] NVARCHAR(50) NOT NULL DEFAULT SUSER_SNAME(), 
    [UpdatedDate] DATETIME2 NOT NULL DEFAULT SYSDATETIME(), 
    CONSTRAINT [FK_TaskSnapshot_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Task]([TaskId]) ON DELETE SET NULL
)

GO

ALTER TABLE [dbo].[TaskSnapshot]
    ADD CONSTRAINT [PK_TaskSnapshotId]
    PRIMARY KEY (TaskSnapshotId)

GO

CREATE INDEX [IX_TaskSnapshot_TaskId] ON [dbo].[TaskSnapshot] ([TaskId])

GO