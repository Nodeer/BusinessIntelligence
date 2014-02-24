CREATE PROCEDURE [dbo].[usp_FindTaskByExternalId]
    @externalId NVARCHAR(100)
AS
BEGIN
    SELECT
        t.TaskId,
        t.ExternalId,
        t.Name
    FROM [dbo].[Task] t
    WHERE t.ExternalId = @externalId;
END
