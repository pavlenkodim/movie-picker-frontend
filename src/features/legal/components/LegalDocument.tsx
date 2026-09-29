import { cn } from "@/shared/libs/utils";

interface LegalDocumentProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  lastUpdated: string;
}

const LegalDocument = ({ title, lastUpdated, className, children, ...props }: LegalDocumentProps) => {
  return (
    <article
      className={cn(
        "max-w-xl mx-auto px-6 pt-24 pb-24 text-gray-700 dark:text-gray-300 leading-relaxed",
        "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3",
        "[&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2",
        "[&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1.5",
        "[&_a]:underline [&_a]:underline-offset-2 [&_a]:text-foreground [&_strong]:text-foreground",
        className,
      )}
      {...props}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">Last updated: {lastUpdated}</p>
      {children}
    </article>
  );
};

export default LegalDocument;
