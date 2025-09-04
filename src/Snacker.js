import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const Snacker = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [price, setPrice] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleAddItem = () => {
    if (!selectedItem || !price) return;

    const existingIndex = items.findIndex(
      (i) => i.name === selectedItem && i.price === price
    );
    let updatedItems = [...items];

    if (existingIndex >= 0) {
      updatedItems[existingIndex].quantity += 1;
    } else {
      updatedItems.push({
        name: selectedItem,
        price: parseFloat(price),
        quantity: 1,
      });
    }

    setItems(updatedItems);
    setOpen(false);
    setPrice('');
    setSelectedItem('');
  };

  const handleDelete = (index) => {
    let updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleQuantityChange = (index, type) => {
    let updatedItems = [...items];
    if (type === 'inc') {
      updatedItems[index].quantity += 1;
    } else if (type === 'dec' && updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    }
    setItems(updatedItems);
  };

  return (
    <Box
      sx={{
        bgcolor: 'black',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <AppBar position='static' sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1, color: 'orange' }}>
            Snackerz
          </Typography>
          <Button
            variant='contained'
            color='warning'
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
        </Toolbar>
      </AppBar>

      {/* Items Section */}
      <Container sx={{ flex: 1, py: 3 }}>
        {items.length === 0 ? (
          <Typography
            align='center'
            sx={{ color: 'white', mt: 5 }}
            variant={isMobile ? 'subtitle1' : 'h6'}
          >
            No items added yet. Tap "Add" to start.
          </Typography>
        ) : (
          <List>
            {items.map((item, index) => (
              <Card
                key={index}
                sx={{
                  mb: 2,
                  bgcolor: '#1c1c1c',
                  color: 'white',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton
                          color='warning'
                          onClick={() => handleQuantityChange(index, 'dec')}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography
                          variant='body1'
                          component='span'
                          sx={{ mx: 1 }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          color='warning'
                          onClick={() => handleQuantityChange(index, 'inc')}
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                        <IconButton
                          edge='end'
                          color='error'
                          onClick={() => handleDelete(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={`₹${item.price} each`}
                      primaryTypographyProps={{ color: 'orange' }}
                      secondaryTypographyProps={{ color: 'gray' }}
                    />
                  </ListItem>
                </CardContent>
              </Card>
            ))}
          </List>
        )}
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: '#1c1c1c',
          p: 2,
          textAlign: 'right',
          borderTop: '1px solid #333',
        }}
      >
        <Typography variant='h6' sx={{ color: 'orange' }}>
          Total: ₹{total}
        </Typography>
      </Box>

      {/* Add Item Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            sx={{ my: 2 }}
          >
            <MenuItem value=''>Select Item</MenuItem>
            <MenuItem value='Tea'>Tea</MenuItem>
            <MenuItem value='Cigarette'>Cigarette</MenuItem>
            <MenuItem value='Juice'>Juice</MenuItem>
            <MenuItem value='Snacks'>Snacks</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </Select>
          <TextField
            fullWidth
            label='Price (₹)'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant='contained'
            color='warning'
            onClick={handleAddItem}
            disabled={!selectedItem || !price}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
