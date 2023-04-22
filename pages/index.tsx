import * as React from "react";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Stack,
  Box,
  Toolbar,
  Typography,
  Container,
  Link,
  CardActionArea,
  Fab,
  Chip,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import data from "@/static/data.json";
import { FileCopy, GitHub } from "@mui/icons-material";

const theme = createTheme();

export default function Index() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(data);
  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value.toLowerCase();
    if (keyword === "") {
      setItems(data);
      return;
    }
    const newItems = data.filter((item) => {
      return (
        item.act.toLowerCase().includes(keyword) ||
        item.prompt.toLowerCase().includes(keyword)
      );
    });
    setItems(newItems);
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setOpen(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Awesome ChatGPT Prompts Searcher
          </Typography>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={open}
        autoHideDuration={800}
        onClose={() => setOpen(false)}
        message="Copied"
      />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Awesome ChatGPT Prompts Searcher
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              This is visuble and keywords searcher for{" "}
              <Link href="https://github.com/f/awesome-chatgpt-prompts">
                Awesome ChatGPT Prompts
              </Link>
              .<br />
              When you use{" "}
              <Link href="https://openai.com/blog/chatgpt">ChatGPT</Link>, you
              can use this site to search for prompts.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <TextField
                label="Search with a keyword"
                variant="standard"
                fullWidth
                onChange={handleChangeKeyword}
              />
            </Stack>
          </Container>
          <Container sx={{ py: 8 }}>
            {items.length === 0 && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{ textAlign: "center" }}
              >
                No result
              </Typography>
            )}
            {items.map((item, index) => (
              <Card
                key={`${item.act}_${index}`}
                sx={{
                  mt: 4,
                  [theme.breakpoints.up("sm")]: {
                    display: "flex",
                    justifyContent: "space-between",
                  },
                }}
                onClick={() => copyToClipboard(item.prompt)}
              >
                <CardMedia
                  component="img"
                  sx={{
                    [theme.breakpoints.up("sm")]: {
                      width: 151,
                    },
                    [theme.breakpoints.down("sm")]: {
                      height: 151,
                    },
                  }}
                  image={`/cards/${item.image}.jpeg`}
                  alt={item.act}
                  loading="lazy"
                />
                <CardActionArea>
                  <CardContent>
                    <Typography component="div" variant="h5">
                      {item.act}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {item.prompt}
                    </Typography>
                  </CardContent>
                  <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                    <FileCopy color="disabled" />
                  </Box>
                </CardActionArea>
              </Card>
            ))}
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <GitHub color="disabled" sx={{ textAlign: "center", width: "100%" }} />
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {"Please come to "}
          <Link color="inherit" href="https://github.com/obrkn">
            My GitHub Profile
          </Link>
          {"."}
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
