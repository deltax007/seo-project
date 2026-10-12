import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'beginner' | 'intermediate' | 'advanced' | 'tech' | 'type' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  let badgeClass = 'badge';
  if (variant === 'beginner') badgeClass += ' badge-beginner';
  else if (variant === 'intermediate') badgeClass += ' badge-intermediate';
  else if (variant === 'advanced') badgeClass += ' badge-advanced';
  else if (variant === 'tech') badgeClass += ' badge-tech';
  else if (variant === 'type') badgeClass += ' badge-type';

  return (
    <span className={`${badgeClass} ${className}`.trim()}>
      {children}
    </span>
  );
}
