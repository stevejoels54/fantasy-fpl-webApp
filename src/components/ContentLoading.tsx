import Typography, { TypographyProps } from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

const variants = [
  "h1",
  "h3",
  "body1",
  "caption",
] as readonly TypographyProps["variant"][];

interface TypographyDemoProps {
  loading?: boolean;
  variant?: TypographyProps["variant"];
}

function TypographyDemo(props: TypographyDemoProps) {
  const { loading = false, variant } = props;

  const filteredVariants = variant ? [variant] : variants;

  return (
    <div>
      {filteredVariants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          {loading ? (
            <Skeleton
              sx={{
                bgcolor: "grey.900",
              }}
            />
          ) : (
            variant
          )}
        </Typography>
      ))}
    </div>
  );
}

interface ContentLoadingProps {
  variant?: TypographyProps["variant"];
}

const ContentLoading: React.FC<ContentLoadingProps> = ({ variant }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <TypographyDemo loading variant={variant} />
      </Grid>
    </Grid>
  );
};

export default ContentLoading;
