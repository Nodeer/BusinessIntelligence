CREATE TABLE [dbo].[TaskSnapshot]
(
    [TaskSnapshotId] INT NOT NULL IDENTITY(1, 1) NOT FOR REPLICATION,
    [SnapshotDate] DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    [TaskId] INT NOT NULL,
    [ExternalId] NVARCHAR(50) NOT NULL DEFAULT '', 
    [Name] NVARCHAR(200) NULL, 
    [Active] BIT NOT NULL DEFAULT 1, 
    [UpdatedBy] NVARCHAR(50) NOT NULL DEFAULT SUSER_SNAME(), 
    [UpdatedDate] DATETIME2 NOT NULL DEFAULT SYSDATETIME(), 
    CONSTRAINT [FK_TaskSnapshot_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Task]([TaskId])
)

GO

ALTER TABLE [dbo].[TaskSnapshot]
    ADD CONSTRAINT [PK_TaskSnapshotId]
    PRIMARY KEY (TaskSnapshotId)

GO

CREATE INDEX [IX_TaskSnapshot_TaskId] ON [dbo].[TaskSnapshot] ([TaskId])

GO