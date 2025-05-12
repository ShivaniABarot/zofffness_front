<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPaymentFieldsToFormSubmissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('form_submissions', function (Blueprint $table) {
            // Add payment-related fields
            $table->string('payment_status')->default('Pending');
            $table->string('payment_intent_id')->nullable();
            $table->timestamp('payment_completed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('form_submissions', function (Blueprint $table) {
            // Remove payment-related fields
            $table->dropColumn('payment_status');
            $table->dropColumn('payment_intent_id');
            $table->dropColumn('payment_completed_at');
        });
    }
}
