import { Avatar } from "./avatar";

export const meta = {
  title: "Avatar",
  description: "User avatar with image or initials fallback",
};

export const SmallInitials = () => <Avatar name="John Chen" size="sm" />;

export const MediumInitials = () => <Avatar name="John Chen" size="md" />;

export const LargeInitials = () => <Avatar name="John Chen" size="lg" />;

export const SingleName = () => <Avatar name="Alice" size="md" />;

export const NoName = () => <Avatar size="md" />;

export const WithImage = () => (
  <Avatar
    src="https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka"
    name="Jane Doe"
    size="lg"
  />
);

export const AllSizesRow = () => (
  <div className="flex items-center gap-3">
    <Avatar name="AB" size="sm" />
    <Avatar name="AB" size="md" />
    <Avatar name="AB" size="lg" />
  </div>
);
