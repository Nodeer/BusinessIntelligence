CREATE PROCEDURE [dbo].[usp_FindTaskByName]
    @name NVARCHAR(400)
AS
BEGIN
    SELECT
        t.TaskId,
        t.ExternalId,
        t.Name
    FROM [dbo].[Task] t
    WHERE CONTAINS(t.Name, @name);
END
