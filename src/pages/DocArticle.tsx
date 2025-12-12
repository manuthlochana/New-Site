import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Eye, ArrowLeft, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const DocArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [tags, setTags] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    setIsLoading(true);

    const { data: articleData, error } = await supabase
      .from('articles')
      .select('*, article_categories(name, slug)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (!error && articleData) {
      setArticle(articleData);
      document.title = `${articleData.title} - Manuth Lochana`;
      
      await supabase
        .from('articles')
        .update({ view_count: articleData.view_count + 1 })
        .eq('id', articleData.id);

      const { data: tagsData } = await supabase
        .from('article_tag_relations')
        .select('article_tags(name, slug)')
        .eq('article_id', articleData.id);

      if (tagsData) {
        setTags(tagsData.map((t: any) => t.article_tags));
      }
    }

    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <section className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-muted border-t-foreground rounded-full animate-spin" />
      </section>
    );
  }

  if (!article) {
    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-heading text-display-sm font-bold text-foreground mb-6">
            Article not found
          </h1>
          <Button asChild variant="default">
            <Link to="/docs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Docs
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <ScrollReveal>
            <Button asChild variant="ghost" className="mb-8 -ml-4">
              <Link to="/docs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Docs
              </Link>
            </Button>
          </ScrollReveal>

          {/* Article Header */}
          <article>
            <ScrollReveal>
              {article.article_categories && (
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4 block">
                  {article.article_categories.name}
                </span>
              )}

              <h1 className="font-heading text-display-sm md:text-display-md font-bold text-foreground tracking-tight mb-6">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.published_at)}
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {article.view_count} views
                </span>
              </div>
            </ScrollReveal>

            {/* Featured Image */}
            {article.featured_image_url && (
              <ScrollReveal delay={50}>
                <div className="mb-12 rounded-lg overflow-hidden">
                  <img
                    src={article.featured_image_url}
                    alt={article.title}
                    className="w-full h-auto"
                  />
                </div>
              </ScrollReveal>
            )}

            {/* Article Content */}
            <ScrollReveal delay={100}>
              <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none mb-8">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {article.content}
                </ReactMarkdown>
              </div>
            </ScrollReveal>

            {/* Tags */}
            {tags.length > 0 && (
              <ScrollReveal delay={150}>
                <div className="flex flex-wrap gap-2 items-center pt-8 border-t border-border">
                  <Tag className="w-4 h-4 text-muted-foreground mr-2" />
                  {tags.map((tag) => (
                    <span
                      key={tag.slug}
                      className="px-3 py-1 bg-muted text-sm text-muted-foreground rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </article>
        </div>
      </div>
    </section>
  );
};

export default DocArticle;