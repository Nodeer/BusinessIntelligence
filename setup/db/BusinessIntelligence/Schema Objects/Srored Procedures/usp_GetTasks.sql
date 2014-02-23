CREATE PROCEDURE [dbo].[usp_GetTasks]
AS
BEGIN
    SELECT
        t.TaskId,
        t.ExternalId,
        t.Name
    FROM [dbo].[Task] t;
END;
