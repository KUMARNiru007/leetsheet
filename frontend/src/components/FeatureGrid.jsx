import React from 'react';
import { ArrowRight, Code, Trophy, Users, TrendingUp, BookOpen, Target } from 'lucide-react';
import codeeditor from "../assets/codeeditor.png"

const cn = (...classes) => classes.filter(Boolean).join(' ');


const Button = ({ children, variant = "default", size = "default", asChild = false, className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-orange-500 text-black hover:bg-orange-600",
    link: "text-orange-500 underline-offset-4 hover:underline hover:text-orange-400"
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3 text-sm"
  };

  const Component = asChild ? 'div' : 'button';
  return (
    <Component
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

// BentoGrid component
const BentoGrid = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full h-full grid-cols-3 gap-4 auto-rows-[14rem]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// BentoCard component
const BentoCard = ({
  name,
  className,
  background,
  description,
  href,
  cta,
  Icon, // Added Icon prop here
  ...props
}) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl cursor-pointer",
      "transform-gpu transition-all duration-300 hover:scale-[1.02]",
      className,
    )}
    style={{
      backgroundColor: 'var(--leetsheet-bg-secondary)',
      border: '1px solid var(--leetsheet-border-primary)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    }}
    {...props}
  >
    <div>{background}</div>
    <div className="p-4">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        {Icon && (
          <Icon
            className="h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75"
            style={{ color: 'var(--leetsheet-orange)' }}
          />
        )}
        <h3 className="text-xl font-semibold" style={{ color: 'var(--leetsheet-text-primary)' }}>
          {name}
        </h3>
        <p className="max-w-lg" style={{ color: 'var(--leetsheet-text-secondary)' }}>{description}</p>
      </div>
      <div
        className={cn(
          "lg:hidden pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <Button
          variant="link"
          size="sm"
          className="pointer-events-auto p-0"
          style={{ color: 'var(--leetsheet-orange)' }}
        >
          <a href={href} className="flex items-center">
            {cta}
            <ArrowRight className="ms-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
    <div
      className={cn(
        "hidden lg:flex pointer-events-none absolute bottom-0 w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button
        variant="link"
        size="sm"
        className="pointer-events-auto p-0"
        style={{ color: 'var(--leetsheet-orange)' }}
      >
        <a href={href} className="flex items-center">
          {cta}
          <ArrowRight className="ms-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    <div
      className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:opacity-100 opacity-0"
      style={{ backgroundColor: 'rgba(255, 161, 22, 0.03)' }}
    />
  </div>
);

// Background components for each card
const CodeBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <div className="text-8xl font-mono" style={{ color: 'var(--leetsheet-orange)' }}>
      {'{ }'}
    </div>
  </div>
);

const StatsBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <div className="grid grid-cols-4 gap-2 p-8">
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 rounded"
          style={{
            backgroundColor: 'var(--leetsheet-orange)',
            opacity: Math.random() > 0.5 ? 1 : 0.3
          }}
        />
      ))}
    </div>
  </div>
);

const TrophyBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Trophy
      className="w-32 h-32"
      style={{ color: 'var(--leetsheet-orange)' }}
    />
  </div>
);

const NetworkBackground = () => (
  <div className="absolute inset-0 opacity-10">
    <svg className="w-full h-full" viewBox="0 0 400 400">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="var(--leetsheet-orange)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <circle cx="100" cy="100" r="4" fill="var(--leetsheet-orange)" />
      <circle cx="300" cy="150" r="4" fill="var(--leetsheet-orange)" />
      <circle cx="200" cy="250" r="4" fill="var(--leetsheet-orange)" />
      <line x1="100" y1="100" x2="300" y2="150" stroke="var(--leetsheet-orange)" strokeWidth="2" />
      <line x1="300" y1="150" x2="200" y2="250" stroke="var(--leetsheet-orange)" strokeWidth="2" />
    </svg>
  </div>
);

// Main component
const Feature = () => {
  return (
    <div className="min-h-screen w-full flex flex-col p-4" style={{ backgroundColor: 'var(--leetsheet-bg-primary)' }}>

      {/* Header */}
      <div className="text-center mb-8 flex-shrink-0">
        <h1 className="text-3xl md:text-6xl font-bold mb-4">
          <span style={{ color: 'var(--leetsheet-orange)' }}>Key</span>
          <span style={{ color: 'var(--leetsheet-text-primary)' }}> Features</span>
        </h1>
        <p className="text-xl" style={{ color: 'var(--leetsheet-text-secondary)' }}>
          Your comprehensive coding interview preparation platform
        </p>
      </div>

      {/* Bento Grid */}
     <div className="flex justify-center items-center w-full">
  <BentoGrid className="h-full max-w-5xl mx-auto mb-6 py-8">
    {/* First Row */}
    <BentoCard
  name="Algorithm Practice"
  className="col-span-2 row-span-2"
  background={
    <div className="relative w-full h-full">
      <img
        src={codeeditor}
        alt="Code Editor"
        className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-90"
      />
      <div className="absolute inset-0 bg-black/20 rounded-xl" /> {/* optional overlay */}
    </div>
  }
  Icon={Code}
  description="Master data structures and algorithms with our curated problem sets."
  href="/practice"
  cta="Start Coding"
/>
    <BentoCard
      name="Progress Analytics"
      className="col-span-1 row-span-1"
      background={<StatsBackground />}
      Icon={TrendingUp}
      description="Track your coding journey with detailed analytics and performance insights."
      href="/analytics"
      cta="View Stats"
    />
    <BentoCard
      name="Achievement System"
      className="col-span-1 row-span-1"
      background={<TrophyBackground />}
      Icon={Trophy}
      description="Earn badges and climb the leaderboard as you solve more problems."
      href="/achievements"
      cta="See Achievements"
    />

    {/* Second Row */}
    <BentoCard
      name="Study Groups"
      className="col-span-1 row-span-1"
      background={<NetworkBackground />}
      Icon={Users}
      description="Join coding communities and solve problems together."
      href="/groups"
      cta="Find Groups"
    />
    <BentoCard
      name="Learning Path"
      className="col-span-2 row-span-1"
      background={<NetworkBackground />}
      Icon={BookOpen}
      description="Follow structured learning paths tailored to your skill level and goals."
      href="/learning"
      cta="Start Learning"
    />
  </BentoGrid>
</div>

    </div>
  );
};

export default Feature;