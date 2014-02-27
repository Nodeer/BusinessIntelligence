CREATE PROCEDURE [dbo].[usp_GetTask]
    @taskId INT
AS
BEGIN
    SELECT
        t.TaskId,
        t.ExternalId,
        t.Name
    FROM [dbo].[Task] t
    WHERE t.TaskId = @taskId;
END;
