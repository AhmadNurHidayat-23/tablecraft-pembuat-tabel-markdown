<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use League\CommonMark\GithubFlavoredMarkdownConverter;
use Symfony\Component\Process\Process;
use Tests\TestCase;

class TableCraftTest extends TestCase
{
    public function test_editor_is_available_without_database_queries(): void
    {
        DB::listen(function (): void {
            $this->fail('Halaman utama tidak boleh mengakses database.');
        });

        $this->get('/')
            ->assertOk()
            ->assertSee('lang="id"', false)
            ->assertSee('Buat Tabel Markdown dengan Mudah.')
            ->assertSee('Salin Markdown')
            ->assertSee('Reset Tabel')
            ->assertSee('id="visual-table"', false);
    }

    public function test_generated_markdown_preserves_structure_and_literal_characters(): void
    {
        $process = new Process([
            'node', '--input-type=module', '-e',
            'import {toMarkdown} from "./resources/js/markdown.js"; console.log(toMarkdown({cells:[["Nama","Catatan","Jumlah"],["A|B","<script>*teks*", "12"]],alignments:["left","center","right"]}));',
        ], base_path());
        $process->mustRun();
        $html = (string) (new GithubFlavoredMarkdownConverter)->convert($process->getOutput());

        $this->assertStringContainsString('<table>', $html);
        $this->assertSame(3, substr_count($html, '<td'));
        $this->assertStringContainsString('align="center"', $html);
        $this->assertStringContainsString('align="right"', $html);
        $this->assertStringContainsString('A|B', $html);
        $this->assertStringContainsString('&lt;script&gt;*teks*', $html);
        $this->assertStringNotContainsString('<script>', $html);
    }
}
