// Image utilities for consistent image handling across the app
export const heroImage = 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
export const collaborationImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
export const teamImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
export const successImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';

// Default developer avatar
export const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';

// Feature icons can use react-icons instead
export const getAvatarUrl = (seed) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

export default {
  heroImage,
  collaborationImage,
  teamImage,
  successImage,
  defaultAvatar,
  getAvatarUrl,
};
