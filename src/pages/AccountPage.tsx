
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

type UserProfile = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

const mockUser: UserProfile = {
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '(555) 123-4567',
  address: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zipCode: '12345',
  country: 'United States',
};

const mockOrders = [
  {
    id: 'ORD-1234',
    date: '2023-04-01',
    total: 124.99,
    status: 'Delivered',
    items: [
      { id: 1, name: 'Wireless Bluetooth Headphones', price: 149.99, quantity: 1 },
      { id: 4, name: 'Stainless Steel Water Bottle', price: 34.95, quantity: 1 }
    ]
  },
  {
    id: 'ORD-1235',
    date: '2023-03-15',
    total: 89.50,
    status: 'Processing',
    items: [
      { id: 5, name: 'Professional Chef Knife', price: 89.50, quantity: 1 }
    ]
  }
];

const AccountPage = () => {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(mockUser);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile Information</h2>
                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
              
              {isEditing ? (
                <form onSubmit={handleSaveProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button type="submit">Save Changes</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(user);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-gray-500 text-sm">Name</h3>
                    <p>{user.firstName} {user.lastName}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Email</h3>
                    <p>{user.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Phone</h3>
                    <p>{user.phone}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Address</h3>
                    <p>{user.address}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">City</h3>
                    <p>{user.city}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">State</h3>
                    <p>{user.state}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Zip Code</h3>
                    <p>{user.zipCode}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Country</h3>
                    <p>{user.country}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Change Password Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
              <h2 className="text-xl font-bold mb-6">Change Password</h2>
              
              <form className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                
                <Button onClick={() => toast.success('Password changed successfully')}>
                  Update Password
                </Button>
              </form>
            </div>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="bg-white rounded-lg shadow-sm border">
              {mockOrders.map((order, index) => (
                <div 
                  key={order.id} 
                  className={`p-6 ${index < mockOrders.length - 1 ? 'border-b' : ''}`}
                >
                  <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{order.id}</h3>
                      <p className="text-gray-500 text-sm">{order.date}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">${order.total.toFixed(2)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="bg-gray-100 text-gray-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs">
                            {item.quantity}
                          </span>
                          <span>{item.name}</span>
                        </div>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex justify-end">
                    <Button variant="outline" size="sm">
                      View Order Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-6">Saved Addresses</h2>
              
              <div className="mb-6 p-4 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Default Address</h3>
                    <p className="mt-2 text-gray-600">
                      {user.firstName} {user.lastName}<br />
                      {user.address}<br />
                      {user.city}, {user.state} {user.zipCode}<br />
                      {user.country}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Delete</Button>
                  </div>
                </div>
              </div>
              
              <Button>Add New Address</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AccountPage;
