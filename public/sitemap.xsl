<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap | DWD</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Browse the public pages in the Dermatology Website Design XML sitemap." />
        <meta property="og:title" content="XML Sitemap | DWD" />
        <meta property="og:description" content="Browse the public pages in the Dermatology Website Design XML sitemap." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <style>
          :root { --background: oklch(1 0 0); --foreground: oklch(0.129 0.042 264.695); --muted: oklch(0.968 0.007 247.896); --muted-foreground: oklch(0.44 0.04 257.417); --border: oklch(0.929 0.013 255.508); --brand-primary: oklch(0.5 0.09 180); --brand-primary-foreground: oklch(0.99 0 0); }
          * { box-sizing: border-box; }
          body { margin: 0; background: var(--background); color: var(--foreground); font-family: system-ui, sans-serif; font-size: 15px; line-height: 1.6; letter-spacing: 0; }
          a { color: var(--brand-primary); text-decoration: none; }
          a:hover { text-decoration: underline; }
          a:focus-visible { outline: 2px solid var(--brand-primary); outline-offset: 4px; }
          .wrap { width: min(1120px, calc(100% - 64px)); margin: auto; }
          header { border-bottom: 1px solid var(--border); }
          .header-inner { display: flex; justify-content: space-between; align-items: center; gap: 24px; min-height: 90px; }
          .brand { display: flex; align-items: center; gap: 12px; color: var(--foreground); font-size: 17px; font-weight: 650; }
          .mark { display: grid; place-items: center; width: 42px; height: 42px; flex: 0 0 42px; background: var(--brand-primary); color: var(--brand-primary-foreground); border-radius: 6px; font-size: 15px; }
          .back { white-space: nowrap; font-size: 14px; }
          main { padding-top: 56px; padding-bottom: 56px; }
          .intro { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; padding-bottom: 32px; }
          .eyebrow { color: var(--brand-primary); font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0 0 10px; }
          h1 { font-family: Georgia, serif; font-size: 42px; line-height: 1.15; font-weight: 400; margin: 0 0 12px; }
          .domain { color: var(--muted-foreground); margin: 0; overflow-wrap: anywhere; }
          .count { text-align: right; color: var(--muted-foreground); white-space: nowrap; }
          .count strong { color: var(--brand-primary); font-size: 36px; line-height: 1.2; font-weight: 500; display: block; }
          table { width: 100%; border-collapse: collapse; table-layout: fixed; }
          thead { background: var(--muted); }
          th { text-align: left; color: var(--muted-foreground); font-size: 12px; text-transform: uppercase; font-weight: 650; padding: 14px 18px; }
          th:first-child { width: 64px; }
          th:last-child { width: 130px; }
          td { padding: 18px; border-bottom: 1px solid var(--border); vertical-align: middle; }
          .number { color: var(--muted-foreground); font-variant-numeric: tabular-nums; font-size: 13px; }
          .page-link { display: inline-block; font-size: 16px; font-weight: 600; text-transform: capitalize; }
          .url { display: block; font-size: 13px; color: var(--muted-foreground); overflow-wrap: anywhere; margin-top: 3px; }
          .language { color: var(--muted-foreground); font-size: 13px; }
          footer { display: flex; justify-content: space-between; gap: 16px; margin-top: 24px; color: var(--muted-foreground); font-size: 13px; }
          @media (max-width: 600px) {
            .wrap { width: calc(100% - 32px); }
            .header-inner { min-height: 80px; gap: 12px; }
            .brand { font-size: 13px; max-width: 220px; }
            .back { font-size: 12px; }
            main { padding-top: 32px; }
            h1 { font-size: 34px; }
            .intro { align-items: flex-start; gap: 12px; }
            .count strong { font-size: 28px; }
            .count { font-size: 12px; }
            th, td { padding: 14px 8px; }
            th:first-child { width: 32px; }
            th:last-child { width: 72px; }
            .page-link { font-size: 14px; }
            .url { font-size: 11px; }
            .language { font-size: 11px; }
            footer { flex-direction: column; gap: 4px; }
          }
        </style>
      </head>
      <body>
        <header>
          <div class="wrap header-inner">
            <a class="brand" href="/"><span class="mark" aria-hidden="true">DW</span><span>Dermatology Website Design</span></a>
            <a class="back" href="/">Visit website &#8599;</a>
          </div>
        </header>
        <main class="wrap">
          <div class="intro">
            <div><p class="eyebrow">Website directory</p><h1>XML Sitemap</h1><p class="domain">dermatologywebsitedesign.com</p></div>
            <div class="count"><strong><xsl:value-of select="count(s:urlset/s:url)" /></strong>Public pages</div>
          </div>
          <table aria-label="Sitemap pages">
            <thead><tr><th scope="col">No.</th><th scope="col">Page / URL</th><th scope="col">Language</th></tr></thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <xsl:variable name="lang" select="xhtml:link[@href=current()/s:loc and @hreflang!='x-default'][1]/@hreflang" />
                <xsl:variable name="path" select="substring-after(s:loc, 'https://dermatologywebsitedesign.com')" />
                <tr>
                  <td class="number"><xsl:value-of select="format-number(position(), '00')" /></td>
                  <td>
                    <a class="page-link" href="{s:loc}">
                      <xsl:choose>
                        <xsl:when test="$path='/'">Home</xsl:when>
                        <xsl:when test="$path='/contact'">Contact</xsl:when>
                        <xsl:otherwise>
                          <xsl:call-template name="page-name"><xsl:with-param name="path" select="$path" /></xsl:call-template>
                        </xsl:otherwise>
                      </xsl:choose>
                    </a>
                    <span class="url"><xsl:value-of select="s:loc" /></span>
                  </td>
                  <td class="language">
                    <xsl:choose>
                      <xsl:when test="$lang='es'">Spanish</xsl:when>
                      <xsl:when test="$lang='fi'">Finnish</xsl:when>
                      <xsl:when test="$lang='en'">English</xsl:when>
                      <xsl:otherwise><xsl:value-of select="$lang" /></xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <footer><span>Dermatology Website Design</span><span><xsl:value-of select="count(s:urlset/s:url)" /> pages &#183; XML sitemap</span></footer>
        </main>
      </body>
    </html>
  </xsl:template>
  <xsl:template name="page-name">
    <xsl:param name="path" />
    <xsl:choose>
      <xsl:when test="contains(substring($path, 2), '/')">
        <xsl:call-template name="page-name"><xsl:with-param name="path" select="concat('/', substring-after(substring($path, 2), '/'))" /></xsl:call-template>
      </xsl:when>
      <xsl:otherwise><xsl:value-of select="translate(substring($path, 2), '-', ' ')" /></xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>