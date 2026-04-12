// Temporary shim replacing @mui/styles during Tailwind migration.
// makeStyles returns a hook that returns an empty object so className={classes.x}
// resolves to undefined (harmless) while each page is being redesigned.
export const makeStyles = () => () => ({});
