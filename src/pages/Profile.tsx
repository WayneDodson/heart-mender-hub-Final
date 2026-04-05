import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { User, Shield, Calendar, Heart } from 'lucide-react';

const GRIEF_CATEGORIES = [
  { value: 'divorce', label: 'Divorce & Separation' },
  { value: 'bereavement', label: 'Bereavement & Loss' },
  { value: 'estrangement', label: 'Family Estrangement' },
  { value: 'health', label: 'Health Diagnosis' },
  { value: 'identity', label: 'Loss of Identity' },
  { value: 'general', label: 'General Support' },
];

const Profile: React.FC = () => {
  const { user, profile, updateProfile, isAdmin } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    display_name: profile?.display_name || '',
    bio: profile?.bio || '',
    grief_category: profile?.grief_category || 'general',
  });

  const getInitials = () => {
    if (profile?.display_name) return profile.display_name.slice(0, 2).toUpperCase();
    if (profile?.username) return profile.username.slice(0, 2).toUpperCase();
    return 'HM';
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateProfile({
      display_name: form.display_name.trim() || null,
      bio: form.bio.trim() || null,
      grief_category: form.grief_category,
    } as any);
    setSaving(false);
    if (error) {
      toast.error('Failed to update profile. Please try again.');
    } else {
      toast.success('Profile updated successfully!');
      setEditing(false);
    }
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : 'Unknown';

  const categoryLabel = GRIEF_CATEGORIES.find(c => c.value === profile?.grief_category)?.label;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your Heart Mender Hub account</p>
        </div>

        {/* Profile Card */}
        <Card className="mb-6 shadow-md border-0">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-healing-600 text-white text-2xl font-bold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile?.display_name || profile?.username || 'Member'}
                  </h2>
                  {isAdmin && (
                    <Badge className="bg-healing-100 text-healing-700 border-healing-200">
                      <Shield className="w-3 h-3 mr-1" /> Admin
                    </Badge>
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-2">@{profile?.username}</p>
                {categoryLabel && (
                  <Badge variant="outline" className="text-xs mb-3">
                    <Heart className="w-3 h-3 mr-1" /> {categoryLabel}
                  </Badge>
                )}
                {profile?.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed">{profile.bio}</p>
                )}
                <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  Member since {memberSince}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-healing-600" /> Edit Profile
            </CardTitle>
            <CardDescription>Update your display name, bio, and community focus area.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label>Username</Label>
              <Input value={profile?.username || ''} disabled className="bg-gray-50 text-gray-500" />
              <p className="text-xs text-gray-400 mt-1">Username cannot be changed.</p>
            </div>

            <div>
              <Label>Email</Label>
              <Input value={user?.email || ''} disabled className="bg-gray-50 text-gray-500" />
            </div>

            <div>
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                placeholder="How you want to appear to others"
                value={form.display_name}
                onChange={e => setForm(f => ({ ...f, display_name: e.target.value }))}
                maxLength={60}
                disabled={!editing}
              />
            </div>

            <div>
              <Label htmlFor="bio">About Me</Label>
              <Textarea
                id="bio"
                placeholder="A brief description about yourself and your journey (optional)"
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                rows={3}
                maxLength={500}
                disabled={!editing}
              />
              {editing && <p className="text-xs text-gray-400 mt-1">{form.bio.length}/500</p>}
            </div>

            <div>
              <Label>Primary Community Area</Label>
              <Select
                value={form.grief_category}
                onValueChange={v => setForm(f => ({ ...f, grief_category: v }))}
                disabled={!editing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GRIEF_CATEGORIES.map(c => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-2">
              {editing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-healing-600 hover:bg-healing-700 text-white"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditing(false);
                      setForm({
                        display_name: profile?.display_name || '',
                        bio: profile?.bio || '',
                        grief_category: profile?.grief_category || 'general',
                      });
                    }}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setEditing(true)}
                  variant="outline"
                  className="border-healing-300 text-healing-700 hover:bg-healing-50"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
